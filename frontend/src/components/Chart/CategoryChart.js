import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Chart.module.scss';
import reactIcons from '../../assets/icons/reactIcons';
import { useSelector } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ transactions = [], displayName = '' }) {
    const categories = useSelector((state) => state.category.categories);
    const totalTransactions = transactions.length;

    // Aggregate data by category
    const categoryCounts = transactions.reduce((acc, transaction) => {
        const { category } = transaction;
        if (!acc[category]) {
            acc[category] = { count: 0, category };
        }
        acc[category].count += 1;
        return acc;
    }, {});

    // Chart colors
    const chartColors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
    ];

    // Function to get the icon for a category
    const getCategoryIcon = (categoryName) => {
        const category = categories.find((cat) => cat.name === categoryName);
        const categoryIconName = category?.icon || '?';

        const matchedItem = reactIcons.find(
            (item) => item.name === categoryIconName
        );

        return matchedItem ? matchedItem.icon : null;
    };

    // Render categories with icons and colors
    const renderChartCategories = () => {
        return Object.values(categoryCounts).map((cat, index) => (
            <div
                key={cat.category}
                className={styles.chartCategory}
                style={{ color: chartColors[index % chartColors.length] }} // Apply color
            >
                <span className={styles.categoryIcon}>
                    {getCategoryIcon(cat.category)}
                </span>
                <span className={styles.categoryName}>{cat.category}</span>
            </div>
        ));
    };

    // Chart data
    const data = {
        labels: Object.keys(categoryCounts), // Categories as labels
        datasets: [
            {
                label: '# of Transactions',
                data: Object.values(categoryCounts).map((item) => item.count), // Count of transactions per category
                backgroundColor: chartColors,
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

    const displaySymbol = () => {
        if(displayName.toLocaleLowerCase() === '+' || displayName.toLocaleLowerCase() === 'income') {
            return <BiSolidPlusCircle className={styles.plusSymbol} />
        } else {
            return <BiSolidMinusCircle className={styles.minusSymbol} />
        }
    }

    return (
        <div className={styles.DoughnutChartContainer}>
            <div className={styles.DoughnutChart}>
                <div className={styles.chartSymbol}>{displaySymbol()}</div>
                <Doughnut data={data} options={options}/>
            </div>
            <div className={styles.DoughnutChartInfo}>{renderChartCategories()}</div>
        </div>
    );
}

export default CategoryChart;
