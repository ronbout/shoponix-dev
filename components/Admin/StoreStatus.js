import React, { useEffect, useRef } from 'react'
import { Table, Form } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'

const options = [
    { key: 'pending', text: 'Pending', value: 'pending' },
    { key: 'approved', text: 'Approved', value: 'approved' },
    { key: 'declined', text: 'Declined', value: 'declined' }
]

const StoreStatus = ({ store }) => {
    const router = useRouter()
    const isFirstRun = useRef(true);

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        updateStatus();
    }, []);

    const updateStatus = async (e, d) => {
        const url = `${baseUrl}/api/store/requests`
        const payload = { _id: store._id, status: d.value };
        await axios.put(url, payload);
        // router.reload()
        router.push('/admin/store-requests')
    }

    return (
        <>
            <Table.Cell>
                <Form.Select
                    name="type"
                    options={options}
                    placeholder='Status'
                    onChange={updateStatus}
                    defaultValue={store.status}
                />
            </Table.Cell>
        </>
    )
}

export default StoreStatus