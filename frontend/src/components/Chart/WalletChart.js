import styles from './Chart.module.scss';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux';
import { IoWallet, IoWalletOutline  } from "react-icons/io5";

ChartJS.register(ArcElement, Tooltip, Legend);

function WalletChart({ transactions = [], type = '' }) {
    const wallets = useSelector((state) => state.wallet.wallets);

    // Aggregate data by walletId
    const walletTotals = transactions.reduce((acc, transaction) => {
        const { walletId, amount } = transaction;
        if (!walletId || !amount) return acc;

        if (!acc[walletId]) {
            acc[walletId] = { total: 0, walletId };
        }
        acc[walletId].total += amount; 
        return acc;
    }, {});

    // Get wallet details by walletId
    const getWalletDetails = (walletId) => {
        return wallets.find((wallet) => wallet._id === walletId) || {};
    };

    // Function to get wallet color from SCSS variables
    const getWalletColor = (walletId) => {
        const wallet = getWalletDetails(walletId);
        const colorVariable = `--color-${wallet.color}`;

        // Fetch the CSS variable value dynamically
        const style = getComputedStyle(document.documentElement);
        const color = style.getPropertyValue(colorVariable).trim();

        return color || '#CCCCCC';
    };

    // Render wallets with icons and colors
    const renderChartWallets = () => {
        return Object.values(walletTotals).map((walletData) => {
            const wallet = getWalletDetails(walletData.walletId) || {};
            console.log('wallet: ', wallet)
            return (
                <div
                    key={walletData.walletId}
                    className={styles.chartCategory}
                    style={{ color: getWalletColor(walletData.walletId) }}
                >
                    <span className={styles.categoryIcon}>
                        <IoWalletOutline />
                    </span>
                    <span className={styles.categoryName}>
                        {wallet.name || 'Deleted wallet'}
                    </span>
                </div>
            );
        });
    };

    // Chart data
    const data = {
        labels: Object.keys(walletTotals).map((walletId) => {
            const wallet = getWalletDetails(walletId);
            return wallet.name || `Deleted wallet`;
        }),
        datasets: [
            {
                label: 'Total Money',
                data: Object.values(walletTotals).map((item) => item.total),
                backgroundColor: Object.keys(walletTotals).map((walletId) =>
                    getWalletColor(walletId)
                ),
                borderWidth: 1,
            },
        ],
    };

    // Tooltip modification to show total money and percentage
    const totalMoney = Object.values(walletTotals).reduce(
        (sum, wallet) => sum + wallet.total,
        0
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const walletTotal = context.raw;
                        return `${context.label}: $${walletTotal.toFixed(2)} (${(
                            (walletTotal / totalMoney) *
                            100
                        ).toFixed(2)}%)`;
                    },
                },
            },
        },
    };

    const symbolClasses = `
        ${styles.chartSymbol} 
        ${styles.walletSymbol} 
        ${type === '+' ? 'primary-green' : type === '-' ? 'primary-red' : 'icon-defaultColor'}
    `.trim();
    
    return (
        <div className={styles.DoughnutChartContainer}>
            <div className={styles.DoughnutChart}>
                {transactions.length ? <div className={symbolClasses}><IoWallet /></div> : ''}
                <Doughnut data={data} options={options} />
            </div>
            <div className={styles.DoughnutChartInfo}>{renderChartWallets()}</div>
        </div>
    );
}

export default WalletChart;
