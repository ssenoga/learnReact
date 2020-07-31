import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import "./message.css";

export default function Message({ user, message }) {
  const is_user = user === message.user;
  return (
    <Card className={`message__card ${is_user && "message__user"}`}>
      <CardContent>
        <Typography color="white" variant="h5" component="h2">
          {message.user}:{message.message}
        </Typography>
      </CardContent>
    </Card>
  );
}
