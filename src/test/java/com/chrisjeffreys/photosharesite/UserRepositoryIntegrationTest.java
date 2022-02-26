package com.chrisjeffreys.photosharesite;

import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.amazonaws.services.dynamodbv2.model.CreateTableRequest;
import com.amazonaws.services.dynamodbv2.model.ProvisionedThroughput;
import com.chrisjeffreys.photosharesite.datamodel.User;
import com.chrisjeffreys.photosharesite.user.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.Assert.assertTrue;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Main.class)
@WebAppConfiguration
@ActiveProfiles("local")
@TestPropertySource(properties = {
        "amazon.dynamodb.endpoint=dynamodb.us-east-2.amazonaws.com",
        "amazon.aws.accesskey=key",
        "amazon.aws.secretkey=secret"
})
public class UserRepositoryIntegrationTest {

    private DynamoDBMapper dynamoDBMapper;

    @Autowired
    private AmazonDynamoDB amazonDynamoDB;

    @Autowired
    UserRepository userRepository;

    private static final String EMAIL = "chrisbjeffreys@gmail.com";
    private static final String PASSWORD = "1234";

    @Before
    public void setup() throws Exception {
        dynamoDBMapper = new DynamoDBMapper(amazonDynamoDB);

        CreateTableRequest tableRequest = dynamoDBMapper
                .generateCreateTableRequest(User.class);
        tableRequest.setProvisionedThroughput(
                new ProvisionedThroughput(1L, 1L));
        amazonDynamoDB.createTable(tableRequest);

        dynamoDBMapper.batchDelete(
                (List<User>)userRepository.findAll());
    }

    @Test
    public void givenUserWithExpectedEmail_whenRunRindAll_thenUserIsFound(){
        User user = new User(EMAIL, PASSWORD);
        userRepository.save(user);
        List<User> result = (List<User>) userRepository.findAll();

        assertTrue(result.size() >= 0);
        assertTrue(result.get(0).getEmail() == EMAIL);
    }
}
