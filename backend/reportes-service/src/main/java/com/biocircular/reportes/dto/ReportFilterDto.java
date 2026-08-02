package com.biocircular.reportes.dto;

import java.time.LocalDate;
import java.util.List;
import jakarta.validation.constraints.*;

public record ReportFilterDto(
        LocalDate fechaDesde,
        LocalDate fechaHasta,
        String clienteId,
        String operadorId,
        String rutaId,
        String loteId,
        String tipoCliente,
        String sector) {
}
