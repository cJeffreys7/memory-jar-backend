package com.chrisjeffreys.photosharesite.dynamodb;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBSaveExpression;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ExpectedAttributeValue;
import com.chrisjeffreys.photosharesite.datamodel.MemoryJar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class Repositories {

    @Autowired
    private DynamoDBMapper dynamoDBMapper;

    public MemoryJar save(MemoryJar jar) {
        dynamoDBMapper.save(jar);
        return jar;
    }

    public MemoryJar getJarId(int id) {
        return dynamoDBMapper.load(MemoryJar.class, id);
    }

    public String delete (int id) {
        MemoryJar jar = dynamoDBMapper.load(MemoryJar.class, id);
        dynamoDBMapper.delete(jar);
        return "Jar deleted!";
    }

    public int update (int id, MemoryJar jar) {
        dynamoDBMapper.save(jar,
                new DynamoDBSaveExpression()
                        .withExpectedEntry("id",
                                new ExpectedAttributeValue(
                                        new AttributeValue().withN(String.valueOf(id))
                                )));
        return id;
    }
}
