import React from 'react'
import Table from '../components/table'
import DropDown from '../components/dropdown'
import { getCountries } from '../services/country-service'

function Countries() {

  const [countries, setCountries] = React.useState([]);
  
  React.useEffect(() => {
    const load = async () => {
      const data = await getCountries();
      setCountries(data.data);
    };
    load();
  }, []);

  const columns = [{
    Header: 'Code',
    accessor: 'code',
  },
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Capital',
    accessor: 'capitalName',
  },
  {
    Header: 'Flag', Cell: tableProps => (
      <div><img width="100" src={tableProps.row.original.flag} /></div>
    )
  },
  ]

  return (
    <div>
      <DropDown />
      <Table columns={columns} data={countries} />
    </div>
  )
}

export default Countries
