package com.biocircular.compostaje.entity;
import jakarta.persistence.*; import java.util.UUID;
@Entity @Table(name="etapa_compostaje") public class EtapaCompostaje { @Id @GeneratedValue private UUID id; private String codigo; private String nombre; @Column(name="orden") private short orden; private String descripcion; private boolean activo=true; public UUID getId(){return id;} public String getCodigo(){return codigo;} public String getNombre(){return nombre;} public short getOrden(){return orden;} }
