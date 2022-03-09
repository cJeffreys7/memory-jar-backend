package com.chrisjeffreys.photosharesite.datamodel;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Objects;
import java.util.Optional;

//enum MediaType { image, video }

@DynamoDBDocument
public class Memory {

    @DynamoDBAttribute
    private String title;

    @DynamoDBAttribute
    private String description;

    @DynamoDBAttribute
    private String type;

    @DynamoDBAttribute
    private String filename;

    public Memory() {
    }

    public Memory(String title, String description, String type, String filename) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.filename = filename;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Memory memory = (Memory) o;
        return title.equals(memory.title) && Objects.equals(description, memory.description) && type.equals(memory.type) && filename.equals(memory.filename);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, type, filename);
    }
}
