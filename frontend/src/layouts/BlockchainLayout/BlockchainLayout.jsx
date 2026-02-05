import React, { useEffect, useState } from "react";
import "./BlockchainLayout.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaLink, FaClock, FaHashtag, FaDatabase, FaUser, FaReceipt, FaCreditCard, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from "react-icons/fa";

function BlockchainLayout() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [expandedBlocks, setExpandedBlocks] = useState({});
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            setLoading(true);
            let url = "https://localhost:8077/blockchain?limit=50";
            if (startDate) url += `&startDate=${startDate}`;
            if (endDate) url += `&endDate=${endDate}`;
            
            const response = await axios.get(url);
            setBlocks(response.data);
            setError(null);
            setCurrentPage(1); // Reset to first page on new fetch
        } catch (error) {
            console.error("Error fetching blockchain:", error);
            setError("No se pudieron cargar los bloques");
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo conectar con la blockchain. Verifique la conexión."
            });
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setStartDate("");
        setEndDate("");
        // We need to call fetchBlocks after state update, but since setState is async, 
        // it's better to just reload or call fetch with empty strings directly.
        // Or use a useEffect dependent on filter trigger. 
        // For simplicity, I'll just reset state and call fetch with empty params manually or wait for user to click filter again.
        // Better UX: clear and fetch immediately.
        setStartDate("");
        setEndDate("");
        
        // Hack to fetch immediately without waiting for state update
        (async () => {
             try {
                setLoading(true);
                const response = await axios.get("https://localhost:8077/blockchain?limit=50");
                setBlocks(response.data);
                setError(null);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    };

    // Pagination logic
    const indexOfLastBlock = currentPage * itemsPerPage;
    const indexOfFirstBlock = indexOfLastBlock - itemsPerPage;
    const currentBlocks = blocks.slice(indexOfFirstBlock, indexOfLastBlock);
    const totalPages = Math.ceil(blocks.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleBlock = (id) => {
        setExpandedBlocks(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const formatTimestamp = (timestamp) => {
        return new Date(timestamp).toLocaleString('es-ES');
    };

    const formatHash = (hash) => {
        if (!hash) return 'N/A';
        return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
    };

    const parseBlockData = (dataString) => {
        try {
            const data = JSON.parse(dataString);
            return data;
        } catch {
            return { tipo: 'data', contenido: dataString };
        }
    };

    const getBlockTypeColor = (data) => {
        const parsed = parseBlockData(data);
        switch(parsed.tipo) {
            case 'reserva': return '#4CAF50';
            case 'pago': return '#2196F3';
            default: return '#9E9E9E';
        }
    };

    const getBlockTypeIcon = (data) => {
        const parsed = parseBlockData(data);
        switch(parsed.tipo) {
            case 'reserva': return <FaReceipt />;
            case 'pago': return <FaCreditCard />;
            default: return <FaDatabase />;
        }
    };

    if (loading) {
        return (
            <div className="blockchain-layout">
                <div className="blockchain-layout-header">
                    <h2 className="blockchain-layout-title">🔗 Blockchain PutumayoStay</h2>
                </div>
                <div className="blockchain-loading">
                    <div className="blockchain-spinner"></div>
                    <p>Cargando blockchain...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blockchain-layout">
                <div className="blockchain-layout-header">
                    <h2 className="blockchain-layout-title">🔗 Blockchain PutumayoStay</h2>
                    <button onClick={fetchBlocks} className="blockchain-refresh-btn">
                        Reintentar
                    </button>
                </div>
                <div className="blockchain-error">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="blockchain-layout">
            <div className="blockchain-layout-header">
                <h2 className="blockchain-layout-title">PutumayoStay BC</h2>
                
                <div className="blockchain-filters">
                    <div className="filter-group">
                        <label>Desde:</label>
                        <input 
                            type="date" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            className="blockchain-date-input"
                        />
                    </div>
                    <div className="filter-group">
                        <label>Hasta:</label>
                        <input 
                            type="date" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)}
                            className="blockchain-date-input"
                        />
                    </div>
                    <button onClick={fetchBlocks} className="blockchain-filter-btn">
                        Filtrar
                    </button>
                    {(startDate || endDate) && (
                        <button onClick={clearFilters} className="blockchain-clear-btn">
                            Limpiar
                        </button>
                    )}
                </div>

                <div className="blockchain-stats">
                    <div className="blockchain-stat">
                        <span className="blockchain-stat-number">{blocks.length}</span>
                        <span className="blockchain-stat-label">Bloques</span>
                    </div>
                    <button onClick={fetchBlocks} className="blockchain-refresh-btn">
                        🔄 Actualizar
                    </button>
                </div>
            </div>

            <div className="blockchain-blocks-container">
                {blocks.length === 0 ? (
                    <div className="blockchain-empty">
                        <p>No hay bloques en la cadena</p>
                    </div>
                ) : (
                    currentBlocks.map((block, index) => {
                        const blockData = parseBlockData(block.data);
                        const isExpanded = expandedBlocks[block.id];
                        
                        return (
                            <div 
                                key={block.id} 
                                className={`blockchain-block ${isExpanded ? 'expanded' : 'collapsed'}`}
                                style={{borderLeft: `4px solid ${getBlockTypeColor(block.data)}`, cursor: 'pointer'}}
                                onClick={() => toggleBlock(block.id)}
                            >
                                <div className="blockchain-block-header">
                                    <div className="blockchain-block-type">
                                        {getBlockTypeIcon(block.data)}
                                        <span>{blockData.tipo || 'Genérico'}</span>
                                    </div>
                                    <div className="blockchain-block-number">
                                        #{block.id}
                                        {isExpanded ? <FaChevronUp style={{marginLeft: '10px'}}/> : <FaChevronDown style={{marginLeft: '10px'}}/>}
                                    </div>
                                </div>
                                
                                <div className="blockchain-block-content">
                                    <div className="blockchain-block-row">
                                        <FaClock className="blockchain-icon" />
                                        <span className="blockchain-label">Timestamp:</span>
                                        <span className="blockchain-value">{formatTimestamp(block.timestamp)}</span>
                                    </div>

                                    {isExpanded && (
                                        <>
                                            <div className="blockchain-block-row">
                                                <FaHashtag className="blockchain-icon" />
                                                <span className="blockchain-label">Hash:</span>
                                                <span className="blockchain-value hash">{formatHash(block.hash)}</span>
                                            </div>
                                            
                                            <div className="blockchain-block-row">
                                                <FaLink className="blockchain-icon" />
                                                <span className="blockchain-label">Hash Anterior:</span>
                                                <span className="blockchain-value hash">{formatHash(block.previous_hash)}</span>
                                            </div>

                                            {blockData.tipo === 'reserva' && (
                                                <div className="blockchain-block-details">
                                                    <h4>📋 Detalles de Reserva</h4>
                                                    <p><strong>Monto:</strong> {blockData.monto}</p>
                                                    <p><strong>Habitación ID:</strong> {blockData.id_habitacion}</p>
                                                    <p><strong>Fechas:</strong> {blockData.fecha_ingreso} - {blockData.fecha_salida}</p>
                                                    <p><strong>Usuario:</strong> {blockData.id_usuario}</p>
                                                </div>
                                            )}

                                            {blockData.tipo === 'pago' && (
                                                <div className="blockchain-block-details">
                                                    <h4>💳 Detalles de Pago</h4>
                                                    <p><strong>Monto:</strong> {blockData.monto}</p>
                                                    <p><strong>Reserva ID:</strong> {blockData.id_reserva}</p>
                                                    <p><strong>Usuario:</strong> {blockData.id_usuario}</p>
                                                </div>
                                            )}

                                            <div className="blockchain-block-row">
                                                <FaUser className="blockchain-icon" />
                                                <span className="blockchain-label">Nonce:</span>
                                                <span className="blockchain-value">{block.nonce}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {blocks.length > itemsPerPage && (
                <div className="blockchain-pagination">
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="pagination-btn"
                    >
                        <FaChevronLeft /> Anterior
                    </button>
                    <span className="pagination-info">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="pagination-btn"
                    >
                        Siguiente <FaChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
}

export default BlockchainLayout;