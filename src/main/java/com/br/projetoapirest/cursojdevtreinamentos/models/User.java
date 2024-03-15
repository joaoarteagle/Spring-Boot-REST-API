package com.br.projetoapirest.cursojdevtreinamentos.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@SequenceGenerator(name = "seq_user", sequenceName = "seq_user", allocationSize = 1, initialValue = 1)
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "TB_USUARIO")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_user")
    private Long id;

    private String name;

    private String fone;

    private int age;


}
