import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MeanData } from "../utils/types";
import deleteHistoryEntry from "../hooks/DeleteHistoryEntry";

interface WordPopupProps {
  open: boolean;
  onClose: () => void;
  wordData: MeanData | null;
  onDelete: (id: number) => void;
}

const WordPopup: React.FC<WordPopupProps> = ({
  open,
  onClose,
  wordData,
  onDelete,
}) => {
  const handleDelete = async () => {
    if (wordData) {
      await deleteHistoryEntry(wordData.id);
      onDelete(wordData.id);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {wordData?.word}
        <IconButton onClick={onClose} style={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {Object.entries(wordData?.definition_data ?? {}).map(([partOfSpeech, definitionData], index) => (
          <div key={index}>
            <Typography variant="h6">{partOfSpeech}</Typography>
            <Typography variant="body1">{definitionData.definition}</Typography>
            {definitionData.example && (
              <Typography variant="body2">
                <strong>Example:</strong> {definitionData.example}
              </Typography>
            )}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordPopup;
