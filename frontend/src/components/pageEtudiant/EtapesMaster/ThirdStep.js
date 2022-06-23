import React, { useState } from "react";
import { Select } from "antd";
/*import {
  addFirstEnseignant,
  addSecondEnseignant,
  addThirdEnseignant,
} from "../../../redux/MasterFilesUploadSlice";
import { useSelector, useDispatch } from "react-redux";*/

const ThirdStep = (props) => {
  //const dispatch = useDispatch();

  // const files = useSelector((state) => state.masterFilesUpload);
  const { Option } = Select;
  const liste = [
    {
      id: "1",
      email: "jury1@gmail.com",
    },
    {
      id: "2",
      email: "jury2@gmail.com",
    },
    {
      id: "3",
      email: "jury3@gmail.com",
    },
    {
      id: "4",
      email: "jury4@gmail.com",
    },
  ];
  const [liste1, setListe1] = useState(liste);
  const [liste2, setListe2] = useState(liste);
  const [liste3, setListe3] = useState(liste);
  const [choixJury, setChoixJury] = useState([
    { jury: liste1[0] },
    { jury: liste2[0] },
    { jury: liste3[0] },
  ]);

  const handleChange = (value, index) => {
    console.log(value, index)
  };

  return (
    <section className="mx-3 mt-3 mb-5 step">
      <h2>
        Cette partie consiste à renseigner les informations sur les enseignants
        qui vont faire partie des membres du jury
      </h2>
      <div className="my-4 d-flex justify-content-around">
        {choixJury.map((elt, index) => {
          return (
            <div key={index}>
              <label
                htmlFor={index}
                className="me-2 "
                style={{ fontSize: "16px", fontWeight: "500" }}
              >
                Informations jury {index + 1}:{" "}
              </label>
              <Select
                defaultValue={elt.jury.email}
                style={{
                  width: 120,
                }}
                onChange={(e) => handleChange(e, index)}
                name={index}
              >
                {index === 0
                  ? liste1.map((elt) => {
                      return (
                        <Option key={elt.id} name={elt.email}>
                          {elt.email}
                        </Option>
                      );
                    })
                  : index === 1
                  ? liste2.map((elt) => {
                      return (
                        <Option key={elt.id} name={elt.email}>
                          {elt.email}
                        </Option>
                      );
                    })
                  : liste3.map((elt) => {
                      return (
                        <Option key={elt.id} name={elt.email}>
                          {elt.email}
                        </Option>
                      );
                    })}
              </Select>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ThirdStep;
