import { Table } from "antd";
import React from "react";

import {MdSend} from "react-icons/md"
//import moment from "moment";
//import {ImCross, ImCheckmark} from "react-icons/im";
import { Link } from "react-router-dom";


const columns = [

  {
    title: "Matricule",
    dataIndex: "matricule",
    sorter: {
      compare: (a, b) => a.matricule.localeCompare(b.matricule),
    },
  },
  {
    title: "Nom et Prenom",
    dataIndex: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
    },
  },
 
  {
    title: "Rapport",
    dataIndex: "rapport",
  },
  {
    title: "Date Soutenance",
    dataIndex: "dateSoutenance",
  },
];

const data = [
  {
    key: "1",
    matricule: <div>19M2214</div>,
    name: <div className="fs-6 fw-light">Nchouwet Mfouapon Kuntz Stephane</div>,
    rapport: (
      <div>
        <Link to="/acteur/rectorat/lecture">
          <button
            type="button"
            className="btn py-1"
            style={{
              color: "white",
              cursor: "pointer",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            <MdSend/> Consulter
          </button>
        </Link>
      </div>
    ),
    dateSoutenance: (
        <div>
          <Link to="/acteur/rectorat/programmation">
            <button
              type="button"
              className="btn py-1"
              style={{
                color: "white",
                cursor: "pointer",
                backgroundColor: "var(--secondaryColor)",
              }}
            >
              <MdSend/> Programmer
            </button>
          </Link>
        </div>
      ),
  },

  {
    key: "2",
    matricule: <div>19M2216</div>,
    name: <div className="fs-6 fw-light">AAAAAA AAAAAA AAAAAA AAAAAAAA</div>,
    rapport: (
      <div>
        <Link to="/acteur/rectorat/lecture">
          <button
            type="button"
            className="btn py-1"
            style={{
              color: "white",
              cursor: "pointer",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            <MdSend/> Consulter
          </button>
        </Link>
      </div>
    ),
    dateSoutenance: (
        <div>
          <Link to="/acteur/rectorat/programmation">
            <button
              type="button"
              className="btn py-1"
              style={{
                color: "white",
                cursor: "pointer",
                backgroundColor: "var(--secondaryColor)",
              }}
            >
              <MdSend/> Programmer
            </button>
          </Link>
        </div>
      ),
  },
  {
    key: "3",
    matricule: <div>19M2217</div>,
    name: <div className="fs-6 fw-light">YAYA YOYO YIYI</div>,
    rapport: (
      <div>
        <Link to="/acteur/rectorat/lecture">
          <button
            type="button"
            className="btn py-1"
            style={{
              color: "white",
              cursor: "pointer",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            <MdSend/> Consulter
          </button>
        </Link>
      </div>
    ),
    dateSoutenance: (
        <div>
          <Link to="/acteur/rectorat/programmation">
            <button
              type="button"
              className="btn py-1"
              style={{
                color: "white",
                cursor: "pointer",
                backgroundColor: "var(--secondaryColor)",
              }}
            >
              <MdSend/> Programmer
            </button>
          </Link>
        </div>
      ),
  },
  {
    key: "4",
    matricule: <div>19M2218</div>,
    name: <div className="fs-6 fw-light">BBBBB BBBBB BBBBB BBBBB</div>,
    rapport: (
      <div>
        <Link to="/acteur/rectorat/lecture">
          <button
            type="button"
            className="btn py-1"
            style={{
              color: "white",
              cursor: "pointer",
              backgroundColor: "var(--secondaryColor)",
            }}
          >
            <MdSend/> Consulter
          </button>
        </Link>
      </div>
    ),
    dateSoutenance: (
        <div>
          <Link to="/acteur/rectorat/programmation">
            <button
              type="button"
              className="btn py-1"
              style={{
                color: "white",
                cursor: "pointer",
                backgroundColor: "var(--secondaryColor)",
              }}
            >
              <MdSend/> Programmer
            </button>
          </Link>
        </div>
      ),
  }
]
 

/*function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}*/

const TableListRectorat = () => {
  return (
    <div className=" mx-3 my-3" style={{overflow:"scroll"}}>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default TableListRectorat;
