package de.neuefische.backend.user;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AppUserRepository extends MongoRepository<AppUser, String>{

}
