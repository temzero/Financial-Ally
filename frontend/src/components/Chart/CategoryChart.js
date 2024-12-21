import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from './Chart.module.scss';
import { useSelector } from 'react-redux';
import { BiSolidPlusCircle, BiSolidMinusCircle } from 'react-icons/bi';
import reactIcons from '../../assets/icons/reactIcons';

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart({ transactions = [], type = '' }) {
    const categories = useSelector((state) => state.category.categories);

    // Aggregate data by categoryId
    const categoryTotals = transactions.reduce((acc, transaction) => {
        const { categoryId, amount } = transaction;
        if (!categoryId || !amount) return acc;

        if (!acc[categoryId]) {
            acc[categoryId] = { total: 0, categoryId };
        }
        acc[categoryId].total += amount; // Sum up the total amount
        return acc;
    }, {});

    // Get category details by categoryId
    const getCategoryDetails = (categoryId) => {
        return categories.find((cat) => cat._id === categoryId) || {};
    };

    // Function to get category color from SCSS variables
    const getCategoryColor = (categoryId) => {
        const category = getCategoryDetails(categoryId);
        const colorVariable = `--color-${category.color}`; 

        // Fetch the CSS variable value dynamically
        const style = getComputedStyle(document.documentElement);
        const color = style.getPropertyValue(colorVariable).trim();

        return color || '#CCCCCC';
    };

    const getCategoryIcon = (categoryId) => {
        const category = getCategoryDetails(categoryId);
        const matchedItem = reactIcons.find((item) => item.name === category?.icon);
        return matchedItem?.icon;
    };

    // Render categories with icons and colors
    const renderChartCategories = () => {
        return Object.values(categoryTotals).map((cat) => {
            const category = getCategoryDetails(cat.categoryId);
            return (
                <div
                    key={cat.categoryId}
                    className={styles.chartCategory}
                    style={{ color: getCategoryColor(cat.categoryId) }}
                >
                    <span className={styles.categoryIcon}>
                        {getCategoryIcon(category._id)}
                    </span>
                    <span className={styles.categoryName}>
                        {category.name || `Deleted category`}
                    </span>
                </div>
            );
        });
    };

    // Chart data
    const data = {
        labels: Object.keys(categoryTotals).map((categoryId) => {
            const category = getCategoryDetails(categoryId);
            return category.name || `Deleted Category`;
        }),
        datasets: [
            {
                label: 'Total Amount',
                data: Object.values(categoryTotals).map((item) => item.total),
                backgroundColor: Object.keys(categoryTotals).map((categoryId) =>
                    getCategoryColor(categoryId) 
                ),
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
                    label: (context) => {
                        const totalAmount = context.raw;
                        const totalSum = Object.values(categoryTotals).reduce(
                            (sum, item) => sum + item.total,
                            0
                        );
                        return `${context.label}: $${totalAmount.toFixed(2)} (${(
                            (totalAmount / totalSum) *
                            100
                        ).toFixed(2)}%)`;
                    },
                },
            },
        },
    };

    const displaySymbol = () => {
        if (type.toLocaleLowerCase() === '+' || type.toLocaleLowerCase() === 'income') {
            return <BiSolidPlusCircle className={`${styles.symbol} primary-green`} />;
        } else {
            return <BiSolidMinusCircle className={`${styles.symbol} primary-red`} />;
        }
    };

    return (
        <div className={styles.DoughnutChartContainer}>
            <div className={styles.DoughnutChart}>
                {transactions.length ? <div className={styles.chartSymbol}>{displaySymbol()}</div> : ''}
                <Doughnut data={data} options={options} />
            </div>
            <div className={styles.DoughnutChartInfo}>{renderChartCategories()}</div>
        </div>
    );
}

export default CategoryChart;
