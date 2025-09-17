package com.sena.school.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.sena.school.models.Teacher;
import com.sena.school.repositories.TeacherRepository;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getAll() {
        return teacherRepository.findAll();
    }

    @GetMapping("/{id}")
    public Teacher getById(@PathVariable Long id) {
        return teacherRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Teacher create(@RequestBody Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    @PutMapping("/{id}")
    public Teacher update(@PathVariable Long id, @RequestBody Teacher teacher) {
        teacher.setId(id);
        return teacherRepository.save(teacher);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        teacherRepository.deleteById(id);
    }


}
