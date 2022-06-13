import React from 'react'

const Programmation = () => {
  return (
    <section>
        <div className='row d-flex justify-content-center align-items-center my-5' style={{width:"100% "}} >
            <div className="col-10  col-sm-5 col-lg-4 px-2 py-2" style={{backgroundColor:"white", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"}}>
                <div className="text-center dateDescription">
                    <h4>Programmer date de soutenance</h4>
                    <p>Vous ètes sur le point de programmer une date de soutenance pour l'étudiant Daniel</p>
                </div>
                <div className="dateInput px-2 pt-4">
                    <p >Selectionnez une date</p>
                    <input type="date" name="dateSoutenance"></input>
                </div>
                <div className="dateButton px-2">
                    <button type="button" className="btn">Programmer</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Programmation