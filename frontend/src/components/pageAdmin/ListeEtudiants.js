import React from 'react';
import ListeEtudiantsMaster from './Liste/ListeEtudiantsMaster';
import ListeEtudiantsThese from './Liste/ListeEtudiantsThese';

const ListeEtudiants = () => {
  return (
    <section>
      <ListeEtudiantsMaster/>
      <ListeEtudiantsThese/>
    </section>
  )
}

export default ListeEtudiants