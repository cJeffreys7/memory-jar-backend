package com.chrisjeffreys.photosharesite.controller;

import com.chrisjeffreys.photosharesite.bucket.BucketService;
import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import com.chrisjeffreys.photosharesite.repository.MemoryJarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/jars")
@CrossOrigin("*")
public class MemoryJarController {

    private MemoryJarRepository jarRepository;
    private BucketService bucketService;

    @Autowired
    public MemoryJarController(MemoryJarRepository jarRepository, BucketService bucketService) {
        this.jarRepository = jarRepository;
        this.bucketService = bucketService;
    }

    @PostMapping(
            path="/{id}/memories/new",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public String uploadMemoryFile(@PathVariable("id") String jarId,
                                       @RequestParam("file") MultipartFile file) {
        return bucketService.uploadMemoryFile(jarId, file);
    }

    @PostMapping("/new")
    public MemoryJar saveJar(@RequestBody MemoryJar jar) {
        return jarRepository.save(jar);
    }

    @GetMapping("/{id}")
    public MemoryJar getJar(@PathVariable("id") String id) {
        return jarRepository.getJarId(id);
    }

    @GetMapping("/owner/{owner}")
    public List<MemoryJar> getJarsByOwner(@PathVariable("owner") String owner) {
        return jarRepository.getJarsByOwner(owner);
    }

    @GetMapping("/{id}/memories/{memoryId}")
    public byte[] getMemoryFile(@PathVariable("id") String jarId,
                                @PathVariable("memoryId") String filename) {
        System.out.println("Retrieving " + filename + " for Jar " + jarId);
        return bucketService.downloadMemoryFile(jarId, filename);
    }

    @DeleteMapping("/{id}")
    public String deleteJar(@PathVariable("id") String id) {
        return jarRepository.delete(id);
    }

    @PutMapping("/{id}")
    public String updateJar(@PathVariable("id") String id, @RequestBody MemoryJar jar) {
        return jarRepository.update(id, jar);
    }
}
