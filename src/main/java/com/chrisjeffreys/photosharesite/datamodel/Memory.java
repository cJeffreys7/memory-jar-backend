package com.chrisjeffreys.photosharesite.datamodel;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBDocument;

import java.util.Objects;

//enum MediaType { image, video }

@DynamoDBDocument
public class Memory {

    @DynamoDBAttribute
    private String memoryId;

    @DynamoDBAttribute
    private String title;

    @DynamoDBAttribute
    private String description;

    @DynamoDBAttribute
    private String type;

    @DynamoDBAttribute
    private String content;

    public Memory() {
    }

    public Memory(String title, String description, String type, String content) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.content = content;
    }

    public String getMemoryId() {
        return memoryId;
    }

    public void setMemoryId(String memoryId) {
        this.memoryId = memoryId;
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Memory memory = (Memory) o;
        return memoryId.equals(memory.memoryId) && title.equals(memory.title) && Objects.equals(description, memory.description) && type.equals(memory.type) && content.equals(memory.content);
    }

    @Override
    public int hashCode() {
        return Objects.hash(memoryId, title, description, type, content);
    }
}
