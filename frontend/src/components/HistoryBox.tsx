import React, { useState } from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CircularProgress from '@mui/material/CircularProgress';
import fetchHistory from '../hooks/FetchHistory';
import { DataItem, MeanData } from '../utils/types';
import WordPopup from './WordPopup';

const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toDateString();
};

// Group words by their formatted timestamp
const groupDataByTimestamp = (data: DataItem[]): Record<string, MeanData[]> => {
  return data.reduce((groups, item) => {
    const formattedDate = formatTimestamp(item.search_timestamp);
    if (!groups[formattedDate]) {
      groups[formattedDate] = [];
    }
    // Create MeanData object with id, word, and definition_data
    const meanData: MeanData = {
      id: item.id,
      word: item.word.word,
      definition_data: item.word.definition_data,
    };
    groups[formattedDate].push(meanData);
    return groups;
  }, {} as Record<string, MeanData[]>);
};

const HistoryBox: React.FC = () => {
  const [data, setData] = useState<DataItem[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<MeanData | null>(null);

  const handleToggle = async () => {
    setExpanded(!expanded);
    if (!expanded) {
      setLoading(true);
      const result = await fetchHistory();
      setData(result);
      setLoading(false);
    }
  };

  const handleWordClick = (wordData: MeanData) => {
    console.log('word data in handlewordclick');
    
    console.log(wordData);
    
    setSelectedWord(wordData);
  };

  const handleClosePopup = () => {
    setSelectedWord(null);
  };


  const handleDelete = (id: number) => {
    if (data) {
      setData(data.filter(item => item.id !== id));
      handleClosePopup();
    }
  };

  const groupedData = data ? groupDataByTimestamp(data) : {};

  return (
    <div className='w-1/6 m-4 mx-auto'>
      <div>
        History
        <IconButton onClick={handleToggle}>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      {expanded && (
        loading ? (
          <div className='flex justify-center items-center'>
            <CircularProgress />
          </div>
        ) : ( data && data.length === 0 ? (
          <div className='flex justify-center items-center'>
            No history
          </div>
        ) :( <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 200,
              '& ul': { padding: 0 },
              boxShadow: 2,
            }}
            subheader={<li />}
          >
            {Object.entries(groupedData).map(([date, words], sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListSubheader>{date}</ListSubheader>
                  {words.map((word, itemId) => (
                    <ListItem button key={`item-${sectionId}-${itemId}`} onClick={() => handleWordClick(word)}>
                      <ListItemText primary={word.word} />
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
        )
        )
      )}
      <WordPopup open={!!selectedWord} onClose={handleClosePopup} wordData={selectedWord} onDelete={handleDelete} />
    </div>
  );
};

export default HistoryBox;
