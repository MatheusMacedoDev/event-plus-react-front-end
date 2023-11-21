import './Table.css';

import TrashImage from '../../../assets/images/trash-delete.svg';
import PenImage from '../../../assets/images/edit-pen.svg';

const Table = ( {data, deleteFn = null, updateFn = null} ) => {
    return (
        <table className='table-data' id='table'>
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                    <th className="table-data__head-title table-data__head-title--big">Título</th>
                </tr>
            </thead>
        </table>
    );
};

export default Table;