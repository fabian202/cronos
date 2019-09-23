import { useState, useEffect } from "react";
import api from '../api'
import _ from 'lodash';
import { useEntryContext } from './useEntryContext'

export const useEntries = () => {
    const { state, dispatch } = useEntryContext();

    // const [ entries, setEntries ] = useState([])
    // const [ total, setTotal ] = useState()
    const [ date, setDate ] = useState(new Date())

    const deleteEntry = (_id) => {
        console.log('delete', _id)
        // console.log(entries)
        // const toDelete = _.each(entries, (item) => {
        //     item.data = _.filter(item.data, (entry) => {
        //         return entry._id !== _id
        //     })
        // })

        // console.log(toDelete)
        // setEntries(toDelete)
    }

    useEffect(() => {
        console.log(date.toISOString())
        const [shortDate] = date.toISOString().split('T')
        const getEntries = async () => {
            try {
                const res = await api.get(`entry?date=${shortDate}`);

                dispatch({
                    type: 'LIST_ENTRIES',
                    entries: res.data
                })
                // const gEntries = _(res.data)
                // .groupBy(x => x.project.name)
                // .map((value, key) => ({key: key, data: value, total: _.sumBy(value, t => t.billable && t.hours)}))
                // .value();
                
                // const grandTotal = _.sumBy(gEntries, 'total')

                // setEntries(gEntries);
                // setTotal(grandTotal)
            } catch (error) {
                console.log(error)
            }
        }
        getEntries();
    }, [date])

    //raw entries
    const { entries } = state;

    //Grouped entries
    const grupedEntries =  _(entries)
        .groupBy(x => x.project.name)
        .map((value, key) => ({key: key, data: value, total: _.sumBy(value, t => t.billable && t.hours)}))
        .value();

    const total = _.sumBy(grupedEntries, 'total')

    return {
        entries,
        grupedEntries,
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
