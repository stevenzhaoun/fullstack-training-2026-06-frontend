import { useDataLoad } from "../../hooks/useDataLoad"
import { listOrders } from "../../api/orders.api"
import type { Order } from "../../types"
import { CircularProgress } from "@mui/material"
import { BarChart } from "@mui/x-charts"

export default function Dashboard() {

    //fetch data
    const {data: orders, isLoading} = useDataLoad<Order[]>(listOrders)

    if(isLoading || !orders) {
        return <CircularProgress/>
    }
    /*
    data manupulation
    input -> oreders -> [{id, email, created_at: 2021-0101}, {id, email, created_at: 2021-01-02}]
    output -> {
        '2021-01-01': [order1, order2],
        '2021-01-02': [order3, order4],
    }
    */

    const ordersByDate = orders.reduce((acc, order) => {
        const date = order.createdAt.split('T')[0]
        if(acc[date]) {
            acc[date].push(order)
        } else {
            acc[date] = [order]
        }
        return acc
    }, {} as Record<string, Order[]>)

    const dates = Object.keys(ordersByDate).sort()

    const seriesData = dates.map(date => {
        const orders = ordersByDate[date]
        return orders.length
    })

    return <div>
        <BarChart
            xAxis={[{data: dates, label: 'Orders'}]}
            series={[{data: seriesData, barLabel: (item) => item.value.toString()}]}
            height={300}
            title="Orders by Date"
        />
    </div>
}