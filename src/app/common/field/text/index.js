import React from 'react';
import TextField from 'material-ui/TextField';

export const Text = field => (
  <TextField
    {...field}
    label={
      field.label ||
      `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`
    }
    type={field.type}
    error={!!field.error}
    helperText={field.error || field.helperText}
    multiline={field.multiline}
    rows={field.rows}
    rowsMax={field.rowsMax}
  />
);
