using UnityEngine;
using System.Collections;

public class ObstacleMover : MonoBehaviour {
	private Rigidbody2D RB2D;
	private Vector2 startPosition;
	private Vector2 velocity;
	public float speed;
	// Use this for initialization
	void Start () {
		RB2D = gameObject.GetComponent<Rigidbody2D> ();
		startPosition = new Vector2 (0.0f, 4.0f);
		velocity = new Vector2 (0, speed);
		RB2D.velocity = velocity;
	}
	
	// Update is called once per frame
	void Update () {
		if (transform.position.y < -6.0f) {
			transform.position = startPosition;
		}
	}
}
