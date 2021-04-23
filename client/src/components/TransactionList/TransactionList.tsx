import React from 'react';

import { useSelector } from 'react-redux';
import { selectTransactionsLoading, selectTransactions } from '../../store/selectors';
import { useCheckTransactions } from '../../hooks'

const TransactionsList = () => {

    useCheckTransactions()

    const loading = useSelector(selectTransactionsLoading)
    const transactions = useSelector(selectTransactions)

    if (loading)
        return <h4>Loading</h4>

    if (transactions.length == 0)
        return <h4>No transactions</h4>

    return (
      <table style={{marginTop:'40px', borderCollapse: 'collapse', border: '1px solid black', marginBottom:'100px'}} >
          <thead>
              <th>ID</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Date</th>
          </thead>
          <tbody>
            {
                transactions.map((t) => {
                    return (<tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.source_email ? t.source_email : 'Topup ===>'}</td>
                        <td>{t.destination_email}</td>
                        <td>£ {t.amount}</td>
                        <td>{t.created_at}</td>
                    </tr>);
                })
            }
          </tbody>
      </table>  
    );
};

export default TransactionsList;
