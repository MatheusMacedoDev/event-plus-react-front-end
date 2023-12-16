import './Table.css';

import TrashImage from '../../../assets/images/trash-delete.svg';
import PenImage from '../../../assets/images/edit-pen.svg';

import { dateFormatDbToView } from '../../../utils/stringFunctions';

import { motion } from 'framer-motion';

const Table = ( {data, deleteFn = null, showEditFormFn = null} ) => {
    return (
        <motion.table
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="table-data" 
            id="table"
        >
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--big">Descrição</th>
                    <th className="table-data__head-title table-data__head-title--big">Tipo de Evento</th>
                    <th className="table-data__head-title table-data__head-title--big">Data</th>
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
                                key={element.id} 
                                className="table-data__head-row"
                            >
                                <td className="table-data__data table-data__data--big">
                                    {element.title}
                                </td>
                                <td className="table-data__data table-data__data--big">
                                    {element.description}
                                </td>
                                <td className="table-data__data table-data__data--big">
                                    {element.eventTypeTitle}
                                </td>
                                <td className="table-data__data table-data__data--big">
                                    {dateFormatDbToView(element.date)}
                                </td>
                                <td className="table-data__data table-data__data--little">
                                    <motion.img 
                                        initial={{ scale: 1.2 }}
                                        whileHover={{ scale: 1.4 }}
                                        whileTap={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => showEditFormFn(element)}
                                        className='table-data__icon'
                                        src={PenImage} 
                                        alt="Ícone de uma caneta. Botão com a função de editar um evento." 
                                        />
                                </td>
                                <td className="table-data__data table-data__data--little">
                                    <motion.img 
                                        initial={{ scale: 1.2 }}
                                        whileHover={{ scale: 1.4 }}
                                        whileTap={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => deleteFn(element.id)}
                                        className='table-data__icon'
                                        src={TrashImage} 
                                        alt="Ícone de uma lixeira. Botão com a função de deletar um evento." 
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