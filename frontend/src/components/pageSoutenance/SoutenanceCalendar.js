import moment from 'moment';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Calendar, Input, Col, Table, Row,
  Typography, Modal, Button, Select,
} from 'antd';
import { toast, ToastContainer } from 'react-toastify'
import '../../Styles/Soutenance.css';

moment.locale('fr');

const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;

const frLocale = {
  "lang": {
    "locale": "fr_FR",
    "placeholder": "Sélectionner une date",
    "rangePlaceholder": ['Date de début', 'Date de fin'],
    "today": "aujourd'hui",
    "now": "maintenant",
    "backToToday": "Retour à aujourd'hui",
    "ok": "OK",
    "clear": "Effacer",
    "month": "Mois",
    "year": "Année",
    "timeSelect": "Selectionner l'heure",
    "dateSelect": "Selectionner la date",
    "monthSelect": "Sélectionner un mois",
    "yearSelect": "Sélectionner une année",
    "decadeSelect": "Choisissez une décennie",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthFormat": "MMMM",
    "monthBeforeYear": true,
    "previousMonth": "Mois précédent (PageUp)",
    "nextMonth": "Moir prochain (PageDown)",
    "previousYear": "Année dernière (Control + left)",
    "nextYear": "Année prochaine (Control + right)",
    "previousDecade": "Décennie passée",
    "nextDecade": "Décennie prochaine",
    "previousCentury": "Dernier siècle",
    "nextCentury": "Siècle prochain"
  },
  "timePickerLocale": {
    "placeholder": "Selectionner l'heure"
  },
  "dateFormat": "YYYY-MM-DD",
  "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
  "weekFormat": "YYYY-wo",
  "monthFormat": "YYYY-MM"
};


export default function SoutenanceCalendar() {
  const [allDatesSoutenance, setAllDatesSoutenance] = useState([{
    date: '2022/08/17',
    etudiants: [
      {
        id: '1111',
        matricule: '18M499',
        nom: 'yo',
        prenom: 'ya',
        niveau: 'MASTER 2',
        sexe: 'Mâle'
      },
    ],
  }]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [datesSoutenance, setDatesSoutenance] = useState(allDatesSoutenance);
  const [etudSearch, setEtudSearch] = useState('');
  const [displayEtudSearchTable, setDisplayEtudSearchTable] = useState(false);

  const tableColumns = [
    {
      title: 'Matricule',
      dataIndex: 'matricule',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a, b) => a.matricule.localeCompare(b.matricule),
      // render: text => <a>{text}</a>,
    },
    {
      title: 'Noms et Prenoms',
      dataIndex: 'nomPrenom',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a, b) => a.nomPrenom.localeCompare(b.nomPrenom),
    },
    {
      title: 'Niveau',
      dataIndex: 'niveau',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a, b) => a.niveau.localeCompare(b.niveau),
    },
    {
      title: 'Sexe',
      dataIndex: 'sexe',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a, b) => a.sexe.localeCompare(b.sexe),
      render: text => text === 'Mâle' ? 'M' : 'F'
    },
    {
      title: 'Date de soutenance',
      dataIndex: 'date',
      sortDirections: ['ascend', 'descend', 'ascend'],
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
  ];

  useEffect(() => {
    // First check in localStorage if results are present. If not present,
    // call endpoint and store result in localStorage for given period (say 1day)
    let dates = JSON.parse(localStorage.getItem('datesSoutenance'));

    if (dates === null) {
      axios.get('/etudiants/dates-soutenance')
        .then(res => {
          console.log(res);
          dates = parseDates(res.data);
          console.log(dates);

          setAllDatesSoutenance(dates);
          // todo also set validity period
          // localStorage.setItem('datesSoutenance', JSON.stringify(dates));
        })
        .catch(err => {
          console.error(err);
          toast.error("Une erreur est survenue", { hideProgressBar: true });
        });
    } else {
      setAllDatesSoutenance(dates);
    }
  }, []);

  /**
   * Convert result received from backend to compatible format
   */
  const parseDates = (dates) => {
    // backend format is an object with keys as dates and values array of etudiants
    // of the form { <date>: [<array etudiants>] }
    // frontend compatible format is an array with objects of the form 
    // [ {'date': <date>, 'etudiants': [<array etudiants>] } ]  
    let result = [];

    for (let date in dates) {
      result.push({
        date,
        etudiants: dates[date]
      });
    }

    return result;
  }

  const handleNiveauChange = (value) => {
    setEtudSearch('');
    setDisplayEtudSearchTable(false);

    if (value !== 'tous') {
      let newDates = [];

      for (let i = 0; i < allDatesSoutenance.length; i++) {
        let dateObj = allDatesSoutenance[i];
        let etudiants = dateObj.etudiants;
        let tempEtuds = [];

        for (let j = 0; j < etudiants.length; j++) {
          let etud = etudiants[j];

          if (etud.niveau === value) {
            tempEtuds.push(etud);
          }
        }

        newDates.push({
          date: dateObj.date,
          etudiants: tempEtuds,
        });
      }

      setDatesSoutenance(newDates);
    } else {
      // Reset list
      setDatesSoutenance(allDatesSoutenance);
    }
  };

  const handleEtudSearchChange = (e) => {
    setEtudSearch(e.target.value);
  };

  const handleEtudiantSearch = (value) => {
    value = value.trim().toLowerCase();

    if (value !== '') {
      let newDates = [];

      for (let i = 0; i < allDatesSoutenance.length; i++) {
        let dateObj = allDatesSoutenance[i];
        let etudiants = dateObj.etudiants;
        let tempEtuds = [];

        for (let j = 0; j < etudiants.length; j++) {
          let etud = etudiants[j];
          if (
            etud.nom.toLowerCase() === value ||
            etud.prenom.toLowerCase() === value ||
            etud.matricule.toLowerCase() === value
          ) {
            tempEtuds.push(etud);
          }
        }

        newDates.push({
          date: dateObj.date,
          etudiants: tempEtuds,
        });
      }

      setDatesSoutenance(newDates);
      setDisplayEtudSearchTable(true);
    } else {
      setDatesSoutenance(allDatesSoutenance);
      setDisplayEtudSearchTable(false);
    }
  };

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => setIsModalVisible(false);

  const handleCancel = () => setIsModalVisible(false);

  const handlePanelChange = (date, mode) => {
    setEtudSearch('');
    setDisplayEtudSearchTable(false);
  };

  function getEtudiantsFromDate(value) {
    let date = value.format('yyyy/MM/DD');

    for (let dateObj of datesSoutenance) {
      if (dateObj['date'] === date) {
        return dateObj['etudiants'];
      }
    }

    return [];
  }

  function dateCellRender(value) {
    let etudiants = getEtudiantsFromDate(value);
    if (etudiants.length > 0) {
      let date = value.format('yyyy/MM/DD');

      // Remove last column (date soutenance)
      let columns = tableColumns.filter((col, idx) => idx !== tableColumns.length - 1);
      // let n = tableColumns.length;
      // for (let i = 0; i < n; i++) {
      //   if (i !== n - 1) {
      //     columns.push(tableColumns[i]);
      //   }
      // }

      let data = [];
      for (let etud of etudiants) {
        data.push({
          id: etud.id,
          key: etud.matricule,
          matricule: etud.matricule,
          nomPrenom: etud.nom + ' ' + etud.prenom,
          niveau: etud.niveau,
        });
      }

      return (
        <div className="modal-btn-wrp">
          <Button
            size="small"
            className="modal-btn"
            type="primary"
            onClick={showModal}
          >
            ...
          </Button>
          <Modal
            title={
              moment() > value
                ? `Etudiants qui vont soutenir le ${date}`
                : `Etudiants ayant soutenus le ${date}`
            }
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelButtonProps={{ style: { display: 'none' } }}
          >
            <Table
              columns={columns}
              style={{ marginBottom: '1rem' }}
              dataSource={data}
              size="small"
              pagination={{ hideOnSinglePage: true }}
              title={() => {
                let message =
                  data.length === 1
                    ? '1 étudiant trouvé'
                    : `${data.length} étudiants trouvés`;
                return <b>{message}</b>;
              }}
            />
          </Modal>
        </div>
      );
    }

    return <></>;
  }

  function etudiantsTableRender() {
    let data = [];
    for (let dateObj of datesSoutenance) {
      for (let etud of dateObj.etudiants) {
        data.push({
          key: etud.id,
          matricule: etud.matricule,
          nomPrenom: etud.nom + ' ' + etud.prenom,
          niveau: etud.niveau,
          date: dateObj.date,
        });
      }
    }

    return (
      <Table
        columns={tableColumns}
        style={{ marginBottom: '1rem' }}
        dataSource={data}
        size="small"
        scroll={{ y: 150 }}
        pagination={{ hideOnSinglePage: true }}
        title={() => {
          let message = '';
          if (data.length === 0) {
            message = 'Aucun étudiant trouvé';
          } else if (data.length === 1) {
            message = '1 étudiant trouvé';
          } else {
            message = `${data.length} étudiants trouvés`;
          }
          return <b>{message}</b>;
        }}
      />
    );
  }

  return (
    <>
      <ToastContainer />
      <Calendar
        className="calendar"
        dateCellRender={dateCellRender}
        onPanelChange={handlePanelChange}
        locale={frLocale}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          const current = value.clone();
          const localeData = value.localeData();
          const months = [];

          for (let i = 0; i < 12; i++) {
            current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let index = start; index < end; index++) {
            monthOptions.push(
              <Select.Option key={`${index}`}>{months[index]}</Select.Option>
            );
          }

          const month = value.month();
          const year = value.year();
          const options = [];
          for (let i = year - 2; i < year + 2; i++) {
            options.push(
              <Select.Option key={i} value={i}>
                {i}
              </Select.Option>
            );
          }
          return (
            <div style={{ padding: 8 }}>
              <Title
                level={4}
                style={{ fontSize: "20px", textAlign: 'center', margin: '1.5rem 0rem', color: "var(--primaryColor)" }}
              >
                SOUTENANCES
              </Title>
              <Row gutter={8}
                style={{ marginBottom: '10px' }}

              >
                <Col span={24} style={{ marginBottom: '5px' }} className="d-flex justify-content-center">
                  <Search
                    allowClear
                    value={etudSearch}
                    onChange={handleEtudSearchChange}
                    placeholder="Nom ou matricule"
                    onSearch={handleEtudiantSearch}
                    style={{ width: "80%" }}
                  />
                </Col>
                <Col span={24} className="d-flex justify-content-center">
                  <Select
                    defaultValue="tous"
                    style={{
                      width: 170,
                      marginRight: '8px',
                      marginBottom: '5px',
                    }}
                    onChange={handleNiveauChange}
                  >
                    <Option value="tous">Tous les niveaux</Option>
                    <Option value="MASTER 2">Master 2</Option>
                    <Option value="DOCTORAT">These</Option>
                  </Select>
                  <Select
                    dropdownMatchSelectWidth={false}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                    value={String(year)}
                    style={{ marginRight: '5px' }}
                  >
                    {options}
                  </Select>
                  <Select
                    dropdownMatchSelectWidth={false}
                    value={String(month)}
                    onChange={(selectedMonth) => {
                      const newValue = value.clone();
                      newValue.month(parseInt(selectedMonth, 10));
                      onChange(newValue);
                    }}
                    style={{ width: 80 }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
              <div>
                {displayEtudSearchTable ? etudiantsTableRender() : <></>}
              </div>
            </div>
          );
        }}
      />
    </>
  );
}
