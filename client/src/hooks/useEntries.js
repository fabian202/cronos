import { useState, useEffect } from "react";
import api from '../api'
import _ from 'lodash';

export const useEntries = () => {
    const [ entries, setEntries ] = useState([])
    const [ total, setTotal ] = useState()
    const [ date, setDate ] = useState(new Date())

    const deleteEntry = (_id) => {
        console.log('delete', _id)
    }

    useEffect(() => {
        console.log(date.toISOString())
        const [shortDate] = date.toISOString().split('T')
        const getEntries = async () => {
            try {
                const res = await api.get(`entry?date=${shortDate}`);
                const gEntries = _(res.data)
                .groupBy(x => x.project.name)
                .map((value, key) => ({key: key, data: value, total: _.sumBy(value, t => t.billable && t.hours)}))
                .value();
                
                const grandTotal = _.sumBy(gEntries, 'total')

                setEntries(gEntries);
                setTotal(grandTotal)
            } catch (error) {
                console.log(error)
            }
        }
        getEntries();
    }, [date])

    // useEffect(() => {
    //     setDate(new Date())
    // }, [])

    return {
        entries,
        total,
        date,
        onDeleteEntry: (_id) => {
            deleteEntry(_id)
        },
        handleDateChange: (date) => {
            setDate(date)
        }
    }
}
