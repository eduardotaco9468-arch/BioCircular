package com.biocircular.reportes.dto;

import java.math.BigDecimal;

public record DashboardDto(
        long totalResiduosRecolectados,
        BigDecimal cantidadCompostProducido,
        long totalClientesAtendidos,
        long totalRutasRealizadas,
        long totalLotesProcesados,
        long vehiculosUtilizados,
        long operadoresActivos,
        double promedioRecoleccionDiaria,
        String aporteAmbientalPorCliente) {
}
