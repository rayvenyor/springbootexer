package com.example.demo.controller;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Person;
import com.example.demo.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@RestController
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @RequestMapping(value="/person", method = RequestMethod.GET)
    public @ResponseBody List<Person> getPerson(@RequestParam(value="id",required = false,defaultValue = "-1") Long id){


        if (id != -1){
            return personRepository.findAllById(id);
        }else{
            return personRepository.findAll();
        }
    }


    @PostMapping("/person")
    public Person createPerson (@Valid @RequestBody Person person){ return personRepository.save(person); }

    @PutMapping("/person/{personId}")
    public Person updateQuestion(@PathVariable Long personId,
                                   @Valid @RequestBody Person personRequest) {
        return personRepository.findById(personId)
                .map(person -> {
                    person.setId(personRequest.getId());
                    person.setCountry(personRequest.getCountry());
                    person.setProvince(personRequest.getProvince());
                    person.setStreet(personRequest.getStreet());
                    person.setFirstname(personRequest.getFirstname());
                    person.setLastname(personRequest.getLastname());
                    person.setMi(personRequest.getMi());
                    return personRepository.save(person);
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + personId));
    }

    @DeleteMapping("/person/{personId}")
    public ResponseEntity<?> deleteQuestion(@PathVariable Long personId) {
        return personRepository.findById(personId)
                .map(person -> {
                    personRepository.delete(person);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new ResourceNotFoundException("Question not found with id " + personId));
    }

}
