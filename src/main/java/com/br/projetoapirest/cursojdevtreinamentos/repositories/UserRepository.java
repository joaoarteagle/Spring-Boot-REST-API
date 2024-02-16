package com.br.projetoapirest.cursojdevtreinamentos.repositories;

import com.br.projetoapirest.cursojdevtreinamentos.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "select u from User u where upper(trim(u.name))   like %?1%")
    List<User> buscaPorNome(String name);

}
