package com.klef.dev.service;
import com.klef.dev.entity.*;
import com.klef.dev.entity.User;
import com.klef.dev.repository.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtworkService {

    @Autowired
    private ArtworkRepository artworkRepository;

    // ---------------- Artist Methods ----------------

    public Artwork addArtwork(Artwork artwork) {
        return artworkRepository.save(artwork);
    }

    public List<Artwork> getArtworksByArtist(User artist) {
        return artworkRepository.findByArtist(artist);
    }

    public boolean deleteArtworkByArtist(Long id, User artist) {
        Optional<Artwork> optionalArtwork = artworkRepository.findById(id);
        if (optionalArtwork.isPresent()) {
            Artwork artwork = optionalArtwork.get();
            if (artwork.getArtist().getId().equals(artist.getId())) {
                artworkRepository.delete(artwork);
                return true;
            }
        }
        return false; // cannot delete another artist's artwork
    }

    public boolean updateArtworkByArtist(Long id, Artwork updatedArtwork, User artist) {
        Optional<Artwork> optionalArtwork = artworkRepository.findById(id);
        if (optionalArtwork.isPresent()) {
            Artwork artwork = optionalArtwork.get();
            if (artwork.getArtist().getId().equals(artist.getId())) {
                artwork.setTitle(updatedArtwork.getTitle());
                artwork.setDescription(updatedArtwork.getDescription());
                artwork.setType(updatedArtwork.getType());
                artwork.setPrice(updatedArtwork.getPrice());
                artworkRepository.save(artwork);
                return true;
            }
        }
        return false; // cannot update another artist's artwork
    }

    // ---------------- Admin Methods ----------------

    // Get all artworks (already exists)
    public List<Artwork> getAllArtworks() {
        return artworkRepository.findAll();
    }

    // Delete any artwork by ID (admin only)
    public boolean deleteArtworkById(Long id) {
        Optional<Artwork> optionalArtwork = artworkRepository.findById(id);
        if (optionalArtwork.isPresent()) {
            artworkRepository.delete(optionalArtwork.get());
            return true;
        }
        return false; // artwork not found
    }
}