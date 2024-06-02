import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Charts = () => {
    const data = [
        {
            timestamp: "2019-01-02T03:50:09.097718",
            flow_id: 52373568,
            in_iface: "eth0",
            event_type: "alert",
            src_ip: "8.42.77.171",
            src_port: 65036,
            dest_ip: "138.68.3.71",
            dest_port: 3306,
            proto: "TCP",
            alert: {
                action: "allowed",
                gid: 1,
                signature_id: 2010937,
                rev: 3,
                signature: "ET SCAN Suspicious inbound to mySQL port 3306",
                category: "Potentially Bad Traffic",
                severity: 2,
            },
        },
        {
            timestamp: "2019-01-02T03:50:10.386108",
            flow_id: 52491840,
            in_iface: "eth0",
            event_type: "alert",
            src_ip: "8.42.77.171",
            src_port: 65386,
            dest_ip: "138.68.3.71",
            dest_port: 5915,
            proto: "TCP",
            alert: {
                action: "allowed",
                gid: 1,
                signature_id: 2002911,
                rev: 5,
                signature: "ET SCAN Potential VNC Scan 5900-5920",
                category: "Attempted Information Leak",
                severity: 2,
            },
        },
        {
            timestamp: "2019-01-02T03:50:10.421359",
            flow_id: 52507296,
            in_iface: "eth0",
            event_type: "alert",
            src_ip: "8.42.77.171",
            src_port: 65438,
            dest_ip: "138.68.3.71",
            dest_port: 5432,
            proto: "TCP",
            alert: {
                action: "allowed",
                gid: 1,
                signature_id: 2010939,
                rev: 3,
                signature: "ET SCAN Suspicious inbound to PostgreSQL port 5432",
                category: "Potentially Bad Traffic",
                severity: 2,
            },
        },
    ];

    // Data transformations for the charts
    const categoryData = Object.values(
        data.reduce((acc, alert) => {
            const category = alert.alert.category;
            if (!acc[category]) {
                acc[category] = { category, count: 0 };
            }
            acc[category].count += 1;
            return acc;
        }, {})
    );

    const severityData = Object.values(
        data.reduce((acc, alert) => {
            const severity = alert.alert.severity;
            if (!acc[severity]) {
                acc[severity] = { severity, count: 0 };
            }
            acc[severity].count += 1;
            return acc;
        }, {})
    );

    const ipData = Object.values(
        data.reduce((acc, alert) => {
            const src_ip = alert.src_ip;
            if (!acc[src_ip]) {
                acc[src_ip] = { src_ip, count: 0 };
            }
            acc[src_ip].count += 1;
            return acc;
        }, {})
    );

    const COLORS = ['#ff6384', '#00C49F', '#FFBB28', '#FF8042'];


    return (
        <div className="App">
            <h1 className="main-heading">Dashboard</h1>
            <div className="chart-container">
                <h2 className="charts-heading">Count by Category</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#36a2eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h2 className="charts-heading">Severity Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={severityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="severity" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h2 className="charts-heading">Source IP Activity</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={ipData}
                            dataKey="count"
                            nameKey="src_ip"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label
                        >
                            {ipData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}






