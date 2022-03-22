package com.chrisjeffreys.photosharesite.datamodel;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Objects;

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

    @DynamoDBAttribute
    private Boolean isFavorited;

    @DynamoDBAttribute
    private Integer timestamp;

    public Memory() {
    }

    public Memory(String title, String description, String type, String filename, Boolean isFavorited, Integer timestamp) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.filename = filename;
        this.isFavorited = isFavorited;
        this.timestamp = timestamp;
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

    public Boolean getIsFavorited() {
        return isFavorited;
    }

    public void setIsFavorited(Boolean isFavorited) {
        this.isFavorited = isFavorited;
    }

    public Integer getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Memory memory = (Memory) o;
        return title.equals(memory.title) && Objects.equals(description, memory.description) && type.equals(memory.type) && filename.equals(memory.filename) && isFavorited.equals(memory.isFavorited) && timestamp.equals(memory.timestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(title, description, type, filename, isFavorited, timestamp);
    }
}
