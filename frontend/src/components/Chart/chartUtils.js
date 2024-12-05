// chartUtils.js
export const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date();
    let filteredTransactions = transactions;

    switch (period) {
        case '1D':
            filteredTransactions = transactions.filter(
                (trans) =>
                    new Date(trans.date) >= new Date(now - 24 * 60 * 60 * 1000)
            );
            break;
        case '1W':
            filteredTransactions = transactions.filter(
                (trans) =>
                    new Date(trans.date) >= new Date(now - 7 * 24 * 60 * 60 * 1000)
            );
            break;
        case '1M':
            filteredTransactions = transactions.filter(
                (trans) =>
                    new Date(trans.date) >= new Date(now.setMonth(now.getMonth() - 1))
            );
            break;
        case '1Y':
            filteredTransactions = transactions.filter(
                (trans) =>
                    new Date(trans.date) >= new Date(now.setFullYear(now.getFullYear() - 1))
            );
            break;
        default:
            break; // 'All' shows all data
    }
    return filteredTransactions;
};

export const balanceLineGraphData = (transactions, balance) => {
    let lineBalance = balance;
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const data = sortedTransactions.map((trans) => {
        const transactionBalance =
            trans.type.toLowerCase() === 'income'
                ? -trans.amount
                : trans.type.toLowerCase() === 'expense'
                ? trans.amount
                : 0;

        lineBalance += transactionBalance;

        return {
            lineBalance,
            date: new Date(trans.date).getTime(),
        };
    });

    if (data.length === 0) {
        data.push({
            lineBalance: balance,
            date: new Date().getTime() - 60 * 60 * 1000, // Simulate one hour ago
        });
    }

    data.push({
        lineBalance: balance,
        date: new Date().getTime(), // Now
    });

    return data.sort((a, b) => a.date - b.date);
};
