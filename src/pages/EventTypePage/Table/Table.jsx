import React from 'react';
import './Table.css';

import TrashImage from '../../../assets/images/trash-delete.svg';
import PenImage from '../../../assets/images/edit-pen.svg';

const Table = ( {data, deleteFn = null, updateFn = null} ) => {
    return (
        <table className='table-data'>
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
                            <tr className="table-data__head-row">
                                <td className="table-data__data table-data__data--big">
                                    element
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <img className="table-data__icon" src={PenImage} alt="" />
                                </td>

                                <td className="table-data__data table-data__data--little">
                                    <img className="table-data__icon" src={TrashImage} alt="" />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
};

export default Table;