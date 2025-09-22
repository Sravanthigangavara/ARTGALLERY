package com.klef.dev.controller;
import com.klef.dev.entity.*;
import com.klef.dev.entity.User;
import com.klef.dev.service.ArtworkService;
import com.klef.dev.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173") // React frontend
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private ArtworkService artworkService;

    // ✅ Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        users.forEach(u -> u.setPassword(null)); // hide passwords
        return ResponseEntity.ok(users);
    }

    // ✅ Delete user by username
    @DeleteMapping("/users/{username}")
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        boolean deleted = userService.deleteUser(username);
        if (deleted) return ResponseEntity.ok("User deleted successfully.");
        else return ResponseEntity.status(404).body("User not found.");
    }

    // ✅ Get all artworks
    @GetMapping("/artworks")
    public ResponseEntity<List<Artwork>> getAllArtworks() {
        List<Artwork> artworks = artworkService.getAllArtworks();
        return ResponseEntity.ok(artworks);
    }

    // ✅ Delete artwork by ID
    @DeleteMapping("/artworks/{id}")
    public ResponseEntity<String> deleteArtwork(@PathVariable Long id) {
        boolean deleted = artworkService.deleteArtworkById(id);
        if (deleted) return ResponseEntity.ok("Artwork deleted successfully.");
        else return ResponseEntity.status(404).body("Artwork not found.");
    }
}