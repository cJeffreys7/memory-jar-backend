package com.chrisjeffreys.photosharesite.controller;

import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import com.chrisjeffreys.photosharesite.repository.MemoryJarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MemoryJarController {

    @Autowired
    private MemoryJarRepository jarRepository;

    @PostMapping("/jar")
    public MemoryJar saveJar(@RequestBody MemoryJar jar) {
        System.out.println("Posting Jar");
        return jarRepository.save(jar);
    }

    @GetMapping("/jar/{id}")
    public MemoryJar getJar(@PathVariable("id") String id) {
        return jarRepository.getJarId(id);
    }

    @DeleteMapping("/jar/{id}")
    public String deleteJar(@PathVariable("id") String id) {
        return jarRepository.delete(id);
    }

    @PutMapping("/jar/{id}")
    public String updateJar(@PathVariable("id") String id, @RequestBody MemoryJar jar) {
        return jarRepository.update(id, jar);
    }
}
