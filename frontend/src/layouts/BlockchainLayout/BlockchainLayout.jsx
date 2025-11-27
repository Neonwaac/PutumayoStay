import React, { useEffect, useState } from "react";
import "./BlockchainLayout.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaLink, FaClock, FaHashtag, FaDatabase, FaUser, FaReceipt, FaCreditCard } from "react-icons/fa";

function BlockchainLayout() {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://localhost:8077/blockchain?limit=50");
            setBlocks(response.data);
            setError(null);
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
                <h2 className="blockchain-layout-title">🔗 Blockchain PutumayoStay</h2>
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
                    blocks.map((block, index) => {
                        const blockData = parseBlockData(block.data);
                        return (
                            <div key={block.id} className="blockchain-block" style={{borderLeft: `4px solid ${getBlockTypeColor(block.data)}`}}>
                                <div className="blockchain-block-header">
                                    <div className="blockchain-block-type">
                                        {getBlockTypeIcon(block.data)}
                                        <span>{blockData.tipo || 'Genérico'}</span>
                                    </div>
                                    <div className="blockchain-block-number">
                                        #{block.id}
                                    </div>
                                </div>
                                
                                <div className="blockchain-block-content">
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
                                    
                                    <div className="blockchain-block-row">
                                        <FaClock className="blockchain-icon" />
                                        <span className="blockchain-label">Timestamp:</span>
                                        <span className="blockchain-value">{formatTimestamp(block.timestamp)}</span>
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
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default BlockchainLayout;