import React from 'react';
import './Table.css';

import TrashImage from '../../../assets/images/trash-delete.svg';
import PenImage from '../../../assets/images/edit-pen.svg';

import { motion } from 'framer-motion';

const Table = ( {data, deleteFn = null, updateFn = null} ) => {
    return (
        <motion.table 
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='table-data' 
            id='table'
        >
             <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--little">Editar</th>
                    <th className="table-data__head-title table-data__head-title--little">Deletar</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map(element => {
                        return (
                            <motion.tr
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                key={element.idTipoEvento}
                                className="table-data__head-row"
                            >
                                <td className="table-data__data table-data__data--big">
                                    { element.titulo }
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <motion.img 
                                        initial={{ scale: 1.2 }}
                                        whileHover={{ scale: 1.4 }}
                                        whileTap={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => updateFn(element.idTipoEvento, element.titulo)} 
                                        className="table-data__icon" 
                                        src={PenImage} alt="" 
                                        id-tipo-evento={element.idTipoEvento}
                                    />
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <motion.img 
                                        initial={{ scale: 1.2 }}
                                        whileHover={{ scale: 1.4 }}
                                        whileTap={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => deleteFn(element.idTipoEvento)} 
                                        className="table-data__icon" 
                                        src={TrashImage} alt="" 
                                    />
                                </td>
                            </motion.tr>
                        )
                    })
                }
            </tbody>
        </motion.table>
    );
};

export default Table;