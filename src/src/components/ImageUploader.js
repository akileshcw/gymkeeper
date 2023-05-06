import React from "react";
import { Avatar, Box } from "@mui/material";
import { Person } from "@mui/icons-material";

const ImageUploader = ({ url, seturl, setfile }) => {
  const handleFile = (e) => {
    try {
      setfile(e.target.files[0]);
      seturl(URL.createObjectURL(e.currentTarget.files[0]));
    } catch (error) {
      setfile(null);
      seturl("");
    }
  };
  return (
    <>
      ̥
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          py: 6,
        }}
      >
        <label htmlFor="image">
          <Avatar src={url} alt="" sx={{ width: 100, height: 100 }}>
            <Person
              style={{
                fontSize: "5rem",
              }}
            />
          </Avatar>
        </label>

        <input
          id="image"
          type="file"
          onChange={handleFile}
          name="image"
          accept="image/*"
          hidden
        />
      </Box>{" "}
    </>
  );
};

export default ImageUploader;
