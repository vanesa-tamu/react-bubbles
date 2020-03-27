import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from '../utils/AxiosWithAuth.js'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log('COLORS state', colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const updateUI = () => {
    axiosWithAuth()
      .get(`http://www.localhost:4000/api/colors`)
      .then(res => {
        console.log('updateUI', res)
        updateColors(res.data)
        setEditing(false)
        setColorToEdit(res.data)
      })
      .catch(err => console.error('error in GET COLORS', err))
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log("colorToEdit State",colorToEdit)
    axiosWithAuth()
      .put(`http://www.localhost:4000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('Response from PUT', res) //{ data: {color: '', code: {hex: ''}, id: # }}
        updateUI()
      })
      .catch( err => console.error("error in PUT ColorList", err) )
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://www.localhost:4000/api/colors/${color.id}`)
      .then(res => {
        console.log('Response from DELETE', res)
        updateUI()
      })
      .catch( err => console.error("error in DELETE ColorList", err) )
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
