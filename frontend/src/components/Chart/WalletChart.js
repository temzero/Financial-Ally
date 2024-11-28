import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Chart.module.scss';
import { useSelector } from 'react-redux';
import { IoWalletOutline, IoWallet } from "react-icons/io5";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function WalletChart({ transactions = [] }) {
    console.log('transactions: ', transactions)
    const allWallets = useSelector((state) => state.wallet.wallets);
    // const transactionWallets = 
    console.log('transactions: ', transactions)
    const totalTransactions = transactions.length;

    // Aggregate data by walletId
    const walletCounts = transactions.reduce((acc, { walletId }) => {
        acc[walletId] = (acc[walletId] || 0) + 1;
        return acc;
    }, {});

    console.log('wallet counts: ', walletCounts)

    // Get wallet details by walletId
    const getWalletDetails = (walletId) => {
        return allWallets.find((wallet) => wallet._id === walletId) || {};
    };

    // Render wallets with icons and colors
    const renderChartWallets = () => {
        return Object.keys(walletCounts).map((walletId) => {
            const wallet = getWalletDetails(walletId);
            return (
                <div
                    key={walletId}
                    className={`${styles.chartCategory} ${styles[`text-${wallet.color}`]} `}
                >
                    <IoWalletOutline className={styles.categoryIcon} />
                    <span className={styles.categoryName}>{wallet.name || `Wallet ${walletId}`}</span>
                </div>
            );
        });
    };

    // Chart data
    const data = {
        labels: Object.keys(walletCounts).map((walletId) => {
            const wallet = getWalletDetails(walletId);
            return wallet.name || `Wallet ${walletId}`; // Use wallet name or fallback to "Wallet <ID>"
        }),
        datasets: [
            {
                label: '# of Transactions',
                data: Object.values(walletCounts), // Count of transactions per wallet
                backgroundColor: Object.keys(walletCounts).map((walletId) => {
                    const wallet = getWalletDetails(walletId);
    
                    // Fetch the CSS variable value
                    const style = getComputedStyle(document.documentElement);
                    const color = style.getPropertyValue(`--background-${wallet.color}`).trim();
    
                    return color || '#CCCCCC'; // Fallback to gray if no color is defined
                }),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
            tooltip: {
                callbacks: {
                    label: (context) =>
                        `${context.label}: ${context.raw} (${(
                            (context.raw / totalTransactions) *
                            100
                        ).toFixed(2)}%)`,
                },
            },
        },
    };

    return (
        <div className={styles.DoughnutChartContainer}>
            <div className={styles.DoughnutChart}>
                <div className={styles.chartSymbol}><IoWallet className={styles.walletSymbol} /></div>
                <Doughnut data={data} options={options}/>  
            </div>
            <div className={styles.DoughnutChartInfo}>{renderChartWallets()}</div>
        </div>
    );
}

export default WalletChart;
