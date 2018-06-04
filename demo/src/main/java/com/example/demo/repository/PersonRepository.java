package com.example.demo.repository;

import com.example.demo.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Collection;
import java.util.List;


@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {
    public List<Person> findAllById (Long id);
}
