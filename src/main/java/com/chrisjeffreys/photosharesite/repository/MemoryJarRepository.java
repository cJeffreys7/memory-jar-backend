package com.chrisjeffreys.photosharesite.repository;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemoryJarRepository {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MemoryJar save(MemoryJar jar) {
        dynamoDBMapper.save(jar);
        return jar;
    }

    public MemoryJar getJarId(String jarId) {
        return dynamoDBMapper.load(MemoryJar.class, jarId);
    }

    public String delete (String jarId) {
        MemoryJar jar = dynamoDBMapper.load(MemoryJar.class, jarId);
        dynamoDBMapper.delete(jar);
        return "Jar deleted!";
    }

    public String update (String jarId, MemoryJar jar) {
        dynamoDBMapper.save(jar,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("jarId",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withS(jarId)
                                )));
        return jarId;
    }
}
