import React from 'react';
import TextField from 'material-ui/TextField';

export default field => (
  <TextField
    {...field}
    label={
      field.label ||
      `${field.name.charAt(0).toUpperCase()}${field.name.slice(1)}`
    }
    error={!!field.error}
    helperText={field.error || field.helperText}
  />
);
