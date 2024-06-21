import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {MeanData} from '../utils/types';

interface ResultsBoxProps {
  data: MeanData;
}

const ResultsBox: React.FC<ResultsBoxProps> = ({ data }) => {

  return (
    <div className='w-1/2 mt-4 mx-auto'>
      <Box sx={{ minWidth: 375 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" >
              {data.word}
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {data.definition_data.noun && (
                <div>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    <strong>Noun:</strong> {data.definition_data.noun.definition}
                  </Typography>

                  {data.definition_data.noun.example && (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    <span> Example: {data.definition_data.noun.example}</span>
                    </Typography>
                  )}
                  </div>
              )}
            </Typography>
            
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {data.definition_data.verb && (
                <div>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    <strong>Noun:</strong> {data.definition_data.verb.definition}
                  </Typography>

                  {data.definition_data.verb.example && (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    <span> Example: {data.definition_data.verb.example}</span>
                    </Typography>
                  )}
                  </div>
              )}
            </Typography>
            
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ResultsBox;
