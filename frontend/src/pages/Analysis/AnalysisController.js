import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoWalletOutline } from 'react-icons/io5';
import Button from '../../components/Button/Button';

const AnalysisController = ({
    walletId,
    periods,
    chartPeriod,
    setPeriodCounter,
    walletCounter, 
    setWalletCounter
}) => {
    const Overlay = useSelector((state) => state.state.isOverlay);
    const wallets = useSelector((state) => state.wallet.wallets) || [];
    const walletIds = [''].concat(wallets.map((wallet) => wallet._id));

    const navigate = useNavigate();
    const walletRef = useRef(null);

    useEffect(() => {
        if (Overlay) return;
        const handleKeyDown = (event) => {
            event.stopPropagation();

            const walletCount = walletIds.length;
            const periodCount = periods.length;

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                setWalletCounter((prev) => (prev + 1) % walletCount);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                setWalletCounter(
                    (prev) => (prev - 1 + walletCount) % walletCount
                );
            } else if (event.key === 'Tab') {
                event.preventDefault();
                setPeriodCounter((prev) => (prev + 1) % periodCount);
            } else if (event.key === '`') {
                event.preventDefault();
                setPeriodCounter(
                    (prev) => (prev - 1 + periodCount) % periodCount
                );
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [walletIds, periods, Overlay, setPeriodCounter, setWalletCounter]);

    useEffect(() => {
        if (walletRef.current) {
            const activeWallet = walletRef.current.querySelector(
                `.active`
            );
            if (activeWallet) {
                activeWallet.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'center',
                });
            }
        }
    }, [walletCounter]);
    

    const walletElements = () => {
        if (wallets.length === 0) {
            return <div>No wallet available!</div>;
        }

        const walletElements = wallets.map((wallet, index) => {
            const activeClass = walletId === wallet._id ? 'active' : '';
            return (
                <div
                    key={wallet._id}
                    className={`wallet-item wallet-item-${wallet.color} ${activeClass}`}
                    onClick={(event) => {
                        if (event.ctrlKey) {
                            setWalletCounter(index + 1);
                            navigate(`/wallet/${wallet.name}`, {
                                state: wallet,
                            });
                        } else {
                            setWalletCounter(index + 1);
                        }
                    }}
                >
                    <IoWalletOutline /> {wallet.name}
                </div>
            );
        });

        walletElements.unshift(
            <div
                key="all-wallets"
                className={`wallet-item ${!walletId ? 'active' : ''}`}
                onClick={(event) => {
                    if (event.ctrlKey) {
                        setWalletCounter(0);
                        navigate('/wallet');
                    } else {
                        setWalletCounter(0);
                    }
                }}
            >
                All wallets
            </div>
        );

        return walletElements;
    };

    return (
        <div className='controller'>
            <div className='controller-wallets' ref={walletRef}>
                {walletElements()}
            </div>
            {wallets.length ? (
                <div className='controller-periods'>
                    {periods.map((period, index) => (
                        <Button
                            key={period}
                            rounded
                            className={`controller-period ${chartPeriod === period ? 'active' : ''}`}
                            onClick={() => setPeriodCounter(index)}
                        >
                            {period}
                        </Button>
                    ))}
                </div>
            ) : (
                'wall'
            )}
        </div>
    );
};

export default AnalysisController;