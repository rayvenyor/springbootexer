package com.example.demo.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name="person")
public class Person{

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size (min = 1, max=100)
    private String firstname;
    @NotBlank
    @Size (min = 1, max=100)
    private String lastname;
    private char mi;
    @Size (min = 1, max=256)
    @Column (columnDefinition="text")
    private String street;
    @NotBlank
    @Size (min = 1, max=100)
    private String province;
    @NotBlank
    @Size (min = 1, max=50)
    private String country;


    public String getFirstname() { return firstname; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }

    public void setLastname(String lastname) { this.lastname = lastname; }

    public char getMi() { return mi; }

    public void setMi(char mi) { this.mi = mi; }

    public String getStreet() { return street; }

    public void setStreet(String street) { this.street = street; }

    public String getProvince() { return province; }

    public void setProvince(String province) { this.province = province; }

    public String getCountry() { return country; }

    public void setCountry(String country) { this.country = country; }

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }
}
