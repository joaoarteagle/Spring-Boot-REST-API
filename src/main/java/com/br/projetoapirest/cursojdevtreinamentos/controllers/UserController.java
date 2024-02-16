package com.br.projetoapirest.cursojdevtreinamentos.controllers;


import com.br.projetoapirest.cursojdevtreinamentos.models.User;
import com.br.projetoapirest.cursojdevtreinamentos.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

//===================================================================================================

    @PostMapping
    public ResponseEntity<User> post(@RequestBody User user){
        User user1 = new User();

        BeanUtils.copyProperties(user, user1);

        return new ResponseEntity<User>(userRepository.save(user1), HttpStatus.CREATED);
    }

//===================================================================================================

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<User>> getAll(){
        List<User> users = userRepository.findAll();

        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }
//===================================================================================================

    @GetMapping(value = "getByID")
    @ResponseBody
    public ResponseEntity<User> getByID(@RequestParam(name = "iduser") Long iduser){
      User user = userRepository.findById(iduser).get();

        return new ResponseEntity<User>(user, HttpStatus.OK);
    }
//===================================================================================================
    @GetMapping(value = "getByName")
    @ResponseBody
    public ResponseEntity<List<User>> getByName(@RequestParam(name = "name") String name){
        List<User> user = userRepository.buscaPorNome(name.trim().toUpperCase());

        return new ResponseEntity<List<User>>(user, HttpStatus.OK);
    }

//===================================================================================================

    @DeleteMapping
    public ResponseEntity<String> delete(@RequestParam Long id){

        userRepository.deleteById(id);

        return new ResponseEntity<String>("User deletado", HttpStatus.OK);
    }
//===================================================================================================

    @PutMapping
    public ResponseEntity<User> update(@RequestParam Long id, @RequestBody User user){


        User user1 = userRepository.findById(id).get();
        user1.setName(user.getName());
        user1.setAge(user.getAge());


        return new ResponseEntity<User>(userRepository.saveAndFlush(user1),HttpStatus.OK);
    }

//===================================================================================================

}
